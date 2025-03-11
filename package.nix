{
  lib,
  buildNpmPackage,
}:
buildNpmPackage {
  pname = "html-greet-frontend";
  version = "0.0.1";

  src = ./.;

  npmDepsHash = "sha256-cgijVq16NE/HiyeZddRNpKx6dOKZzg3PMa8LDLEIDp8=";

  makeCacheWritable = true;

  installPhase = ''
    runHook preInstall

    mkdir -p $out/share
    cp -r dist $out/share/html-greet-frontend

    runHook postInstall
  '';
  meta = {
    description = "html-greet-frontend is a frontend for the html-greet project";
    homepage = "https://github.com/HumXC/html-greet-frontend";
    license = lib.licenses.gpl3Only;
    maintainers = with lib.maintainers; [winter];
  };
}
