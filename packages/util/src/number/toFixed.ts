// Copyright 2019 Centrality Investments Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * convert number to string, without science notion
 * @param x
 */
export default function toFixed(x: number): string {
  if (Math.abs(x) < 1.0) {
    const [fixed, e] = x.toString().split('e-');
    if (!e) {
      return x.toString();
    }
    const decimal = fixed.split('.')[1] || '';
    return x.toFixed(decimal.length + parseInt(e));
  } else {
    const [fixed, e] = x.toString().split('e+');
    if (!e) {
      return x.toString();
    }
    const [front, decimal = ''] = fixed.split('.');
    return front + decimal + new Array(parseInt(e) - decimal.length + 1).join('0');
  }
}
