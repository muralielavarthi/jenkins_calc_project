FROM nginx:alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN rm /etc/nginx/conf.d/default.conf \
    /etc/nginx/nginx.conf

COPY index.html /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /tmp/nginx \
    && chown -R appuser:appgroup /usr/share/nginx \
        /var/cache/nginx /var/run /etc/nginx /tmp/nginx

USER appuser

CMD ["nginx", "-g", "daemon off;"]