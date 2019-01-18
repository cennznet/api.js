#!/bin/bash
#
# Generates plug node artefacts for cluster bootstrap, compress, and serve over HTTP
#
set -e

NODES=$PLUG_NETWORK_SIZE

# Create nodes config, storage, and key-pair
generate_configs () {

  # copy config to docker volume (shared between 2 containers sequentially)
  cd /srv/plug
  cp /opt/code/config.yaml /srv/plug/config.yaml
  pwd
  echo "Generating node configs from base config:"
  cat config.yaml
  echo "node size: $NODES"
  plug-dev create-network -b 0.0.0.0 \
                          -z 6603 \
                          -p 8181 \
                          -n $NODES \
                          ./config.yaml
  echo "$(ls -al)"
  ls -al nodes
}

# Dynamically add initial peer addresses to config.yaml
# Needed as `plug-dev create-network`-
# overwrites peers list with local addresses.
patch_initial_peers () {

  nodes=$NODES
  for i in $(seq 1 $nodes)
  do
    echo "        - tcp://$SERVICE_NAME-${i-1}.$NAMESPACE:6603" >> "nodes/peers.list"
  done
  echo "Patching configs with peers:"
  cat "nodes/peers.list"

  cd nodes
  for dir in */
  do
    base=$(basename "$dir")
    echo "Adding initial peer addresses to network config ($base)..."
    sed -i -e 's|^.*tcp://127\.0\.0\.1:.*||g' $base/config.yaml
    sed -i -e 's|http://127\.0\.0\.1|http://0\.0\.0\.0|g' $base/config.yaml
    sed -i -e '/^$/d' $base/config.yaml
    sed -i '/initial_peers:/r peers.list' $base/config.yaml

    # remove absolute path to node dir as we're creating generic config
    sed -i -e "s|/nodes/$base||g" $base/config.yaml
    sed -i -e 's|/srv/plug/id_ed25519|/mnt/plug/keys/id_ed25519|g' $base/config.yaml
    sed -i -e 's|/srv/plug/storage|/mnt/plug/storage/storage|g' $base/config.yaml
    pwd
    echo "Node config for $base is:"
    cat $base/config.yaml
  done
  rm peers.list

  echo "Done patch_initial_peers";
}

#
# Main
#
generate_configs
patch_initial_peers
