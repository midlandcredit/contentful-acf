/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    basePath: '/poc/',
    trailingSlash: true,
};

// console.log('next debug is: ', process.env.NEXT_DEBUG);

export default nextConfig;


// /** @type {import('next').NextConfig} */
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Convert import.meta.url to __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const nextConfig = {
//   output: 'export',
//   webpack: (config) => {
//     config.resolve.alias['@'] = path.resolve(__dirname, 'src');
//     return config;
//   },
//   pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
// };

// console.log('next debug is: ', process.env.NEXT_DEBUG);

// export default nextConfig;
