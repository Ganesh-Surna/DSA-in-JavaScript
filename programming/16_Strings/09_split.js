let s = '..he..ll.o...'  
// Output: ['',   '',  'he', '', 'll', 'o', '',   '', '']
  
s = '..he...ll.o...' 
// Output: ['', '',   'he', '', '', 'll', 'o',  '', '', '']
  
  console.log(s.split('.'))