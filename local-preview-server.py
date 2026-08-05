from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse
import mimetypes
import sys


ROOT = Path(__file__).resolve().parent / "deploy-6a25c0b5b971448233fc1a51"
TEXT_EXTS = {".html", ".js", ".css", ".json", ".xml", ".txt", ".webmanifest"}


class PreviewHandler(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self._serve(send_body=False)

    def do_GET(self):
        self._serve(send_body=True)

    def _serve(self, send_body):
        parsed = urlparse(self.path)
        request_path = unquote(parsed.path.split("?", 1)[0])
        rel = request_path.lstrip("/")
        target = (ROOT / rel).resolve()

        if not str(target).startswith(str(ROOT)):
            self.send_error(403)
            return

        if target.is_dir():
            target = target / "index.html"

        if not target.exists():
            index_candidate = target / "index.html"
            if index_candidate.exists():
                target = index_candidate
            elif Path(request_path).suffix == "":
                target = ROOT / "index.html"
            else:
                self.send_error(404, "File not found")
                return

        suffix = target.suffix.lower()
        content_type = mimetypes.guess_type(str(target))[0] or "application/octet-stream"
        data = target.read_bytes()

        if suffix in TEXT_EXTS:
            text = data.decode("utf-8", errors="replace")
            text = text.replace("https://cleava.fi/", "/")
            text = text.replace("https://cleava.fi", "/")
            text = text.replace("http://cleava.fi/", "/")
            text = text.replace("http://cleava.fi", "/")
            data = text.encode("utf-8")
            if content_type == "application/octet-stream":
                content_type = "text/plain; charset=utf-8"
            elif "charset" not in content_type:
                content_type += "; charset=utf-8"

        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if send_body:
            self.wfile.write(data)

    def log_message(self, fmt, *args):
        sys.stdout.write("%s - %s\n" % (self.address_string(), fmt % args))


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8082
    server = ThreadingHTTPServer(("127.0.0.1", port), PreviewHandler)
    print(f"Serving {ROOT} at http://127.0.0.1:{port}/")
    server.serve_forever()


if __name__ == "__main__":
    main()
