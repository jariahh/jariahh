import 'dart:io';
import 'dart:convert';
import 'package:sass/sass.dart' as sass;

Future<void> main() async {
  final server = await createServer();
  print('Server started: ${server.address} port ${server.port}');
  await handleRequests(server);
}
Future<HttpServer> createServer() async {
  final address = '0.0.0.0';
  const port = 8080;
  return await HttpServer.bind(address, port);
}
Future<void> handleRequests(HttpServer server) async {
  await for (HttpRequest request in server) {
    switch (request.method) {
      case 'GET':
        handleGet(request);
        break;
      case 'POST':
        handlePost(request);
        break;
      default:
        handleDefault(request);
    }
  }
}
void handleGet(HttpRequest request) {
  new File("./web/index.html").readAsString()
      .then((value) =>
  request.response
    ..headers.add(HttpHeaders.contentTypeHeader, 'text/html')
    ..write(value)
    ..close());
}

Future<void> handlePost(HttpRequest request) async {
  Map result = json.decode(await utf8.decoder.bind(request).join());
  var postedScss = result['scss'];
  sass.compileStringToResultAsync(postedScss, loadPaths: ["./node_modules/"]).then((value) => {
    request.response
    ..write(value.css)
    ..close()
  }).catchError((onError) => {
    request.response
      ..write(onError.toString())
      ..close()
  });
}
void handleDefault(HttpRequest request) {
  request.response
    ..statusCode = HttpStatus.methodNotAllowed
    ..write('Unsupported request: ${request.method}.')
    ..close();
}
