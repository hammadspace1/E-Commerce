import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = [
        '/',
        '/products',
        '/contactUs',
        '/aboutUs',
        '/userVerification',
        '/login',
        '/signup'
    ].includes(path);

    const token = request.cookies.get("token")?.value || "";

    // Check if the user is authenticated
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Define the path for adding products
    const isAddProductPath = path === 'http://localhost:3000/api/productUpload'; // Adjust as necessary

    // Allow only POST requests to add products from your app
    if (isAddProductPath && request.method !== 'POST') {
        return NextResponse.json({ error: 'Only POST requests are allowed for adding products.' }, { status: 405 });
    }

    // Optionally validate the referer for product addition
    if (isAddProductPath && request.method === 'POST') {
        const referer = request.headers.get('referer');
        if (!referer || !referer.startsWith('http://localhost:3000')) { // Replace with your app's URL
            return NextResponse.json({ error: 'Requests must come from the app.' }, { status: 403 });
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/products',
        '/createProduct',
        '/aboutUs',
        '/contactUs',
        '/adminDashboard',
        '/userVerification',
        '/api/productUpload' // Include your API route here
    ],
};


// import { NextURL } from 'next/dist/server/web/next-url'
// import { NextResponse } from 'next/server'
 
// export function middleware(request){

//     const path = request.nextUrl.pathname;

//     const isPublicPath = path === '/' || path === '/products' || path === '/contactUs' || path === '/aboutUs' || path === '/userVerification' || path === '/login' || path === '/signup'

//     const token = request.cookies.get("token")?.value || ""
    
//     if (!isPublicPath && !token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }
// }
// export const config = {
//   matcher: [
//     '/',
//     '/login',
//     '/signup',
//     '/products',
//     '/createProduct',
//     '/aboutUs',
//     '/contactUs',
//     '/adminDashboard',
//     '/userVerification'
//   ],
// }