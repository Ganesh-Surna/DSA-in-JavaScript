
// ### 1. `length`
```
let str = "hello";
console.log(str.length); // 5
```

// ### 2. `toUpperCase()` / `toLowerCase()`
```
let str = "Hello";
console.log(str.toUpperCase()); // "HELLO"
console.log(str.toLowerCase()); // "hello"
```

// ### 3. `charAt()` / `charCodeAt()`
```
let str = "hello";
console.log(str.charAt(1)); // "e"
console.log(str.charCodeAt(1)); // 101 (ASCII of 'e')
```

// ### 4. `indexOf()` / `lastIndexOf()`
```
let str = "hello world";
console.log(str.indexOf("l")); // 2 (first occurrence)
console.log(str.lastIndexOf("l")); // 9 (last occurrence)
```

// ### 5. `substring()` / `slice()`
```
let str = "hello world";
console.log(str.substring(0, 5)); // "hello"
console.log(str.slice(6, 11)); // "world"
```

// ### 6. `split()`
```
let str = "apple,banana,orange";
console.log(str.split(",")); // ["apple", "banana", "orange"]
```

// ### 7. `replace()`
```
let str = "hello world";
console.log(str.replace("world", "there")); // "hello there"
```

// ### 8. `trim()` / `trimStart()` / `trimEnd()`
```
let str = "  hello  ";
console.log(str.trim()); // "hello"
console.log(str.trimStart()); // "hello  "
console.log(str.trimEnd()); // "  hello"
```

// ### 9. `startsWith()` / `endsWith()`
```
let str = "hello world";
console.log(str.startsWith("hello")); // true
console.log(str.endsWith("world")); // true
```

// ### 10. `includes()`
```
let str = "hello world";
console.log(str.includes("lo")); // true
```

// ### 11. `concat()`
```
let str1 = "hello";
let str2 = " world";
console.log(str1.concat(str2)); // "hello world"
```

// ### 12. `repeat()`
```
let str = "ha";
console.log(str.repeat(3)); // "hahaha"
```

// ### 13. `padStart()` / `padEnd()`
```
let str = "5";
console.log(str.padStart(3, "0")); // "005"
console.log(str.padEnd(3, "0")); // "500"
```

// ### 14. `match()`
```
let str = "hello world";
console.log(str.match(/o/g)); // ["o", "o"]
```

// ### 15. `search()`
```
let str = "hello world";
console.log(str.search("world")); // 6
```

// ### 16. String.fromCharCode(ANY_NUMBER)
```
// ASCII Codes (0–127)
console.log(String.fromCharCode(65));    // 'A' (ASCII 65)
console.log(String.fromCharCode(97));    // 'a' (ASCII 97)
console.log(String.fromCharCode(32));    // ' ' (Space, ASCII 32)

console.log(String.fromCharCode(72, 69, 76, 76, 79)); // 'HELLO'

const codes = [72, 101, 108, 108, 111];
const message = String.fromCharCode(...codes);
console.log(message); // 'Hello'

console.log(String.fromCharCode(-1)); // '' (No output)

// Unicode (Beyond ASCII)
console.log(String.fromCharCode(9731));  // '☃' (Snowman, Unicode 9731)
console.log(String.fromCharCode(128512)); // '😀' (Grinning Face, Unicode 128512)
```