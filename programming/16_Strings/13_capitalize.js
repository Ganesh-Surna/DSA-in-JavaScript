function capitalizeWords(str) {
    return str
      .split(' ')                      // Split into words
      .map(word =>                     
        word.charAt(0).toUpperCase() + // Capitalize first letter
        word.slice(1).toLowerCase()    // Lowercase the rest
      )
      .join(' ');                      // Rejoin into a string
  }
  
  // Example Usage
  console.log(capitalizeWords("hello world"));  // "Hello World"
  console.log(capitalizeWords("hI tHERE"));     // "Hi There"