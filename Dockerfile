# atlas.html is page content without a document skeleton (it is also published as a Claude artifact); head.html supplies it.
FROM nginx:1.30-alpine
COPY head.html atlas.html /tmp/
RUN cat /tmp/head.html /tmp/atlas.html > /usr/share/nginx/html/index.html && printf '\n</html>\n' >> /usr/share/nginx/html/index.html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
