# Gunakan image resmi Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies untuk native build
RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  libc6-compat \
  curl

# Salin file package.json dan lock file
COPY package*.json ./

# Install dependencies produksi
RUN npm install --omit=dev

# Salin semua source code
COPY . .

# Build Next.js (wajib dilakukan sebelum jadi non-root user)
RUN npm run build

# Buat user non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Ubah kepemilikan folder
RUN chown -R nextjs:nodejs /app

# Gunakan user non-root
USER nextjs

# Expose port yang digunakan oleh Next.js
EXPOSE 3000

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Jalankan server Next.js (build hasil akan dilayani oleh next)
CMD ["npx", "next", "start"]
