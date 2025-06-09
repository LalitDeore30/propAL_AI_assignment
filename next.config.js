/** @type {import('next').NextConfig} */
const repo = 'your-repo-name'; // 🔁 Replace with your GitHub repository name

const nextConfig = {
    output: 'export',
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
