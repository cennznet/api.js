export default {
    "Direction": {
      "_enum": ["Up", "Left", "Down", "Right"]
    },
  "Food": {
    "x": "i8",
    "y": "i8"
    },
  "Snake": {
    "body": "Vec<(i8,i8)>",
    "dir": "Direction",
    "direction_changed": "bool"
    },
  "WindowSize": {
    "window_width": "i8",
    "window_height": "i8"
    }
}
