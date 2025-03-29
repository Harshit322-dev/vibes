import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Server running on port {PORT}")
    print(f"Visit this link to view the website: http://localhost:{PORT}")
    httpd.serve_forever() 