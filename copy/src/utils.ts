export const shuffleArray = (array: any[]) => 
// 'randomizes' the positions of questions 
// so that the correct one wouldnt always be first
[...array].sort(()=> Math.random() - 0.5); 