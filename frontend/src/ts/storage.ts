
export type CartItem = { _id:string; title:string; price:number; image:string; quantity:number; category?:string };
export const getToken = ():string => localStorage.getItem('amt_token') || '';
export const getUser = () => JSON.parse(localStorage.getItem('amt_user') || 'null');
export const setUserSession = (data:any) => { localStorage.setItem('amt_token', data.token); localStorage.setItem('amt_user', JSON.stringify(data)); };
export const clearUserSession = () => { localStorage.removeItem('amt_token'); localStorage.removeItem('amt_user'); };
export const getCart = ():CartItem[] => JSON.parse(localStorage.getItem('amt_cart') || '[]');
export const saveCart = (cart:CartItem[]) => localStorage.setItem('amt_cart', JSON.stringify(cart));
