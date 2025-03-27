{
  lib,
  buildNpmPackage,
}:
buildNpmPackage {
  pname = "aikadm-frontend";
  version = "0.0.4";

  src = ./.;

  npmDepsHash = "sha256-GeR0J5ifaGfqjboY3WHlP4jRexF3jMtnaIFxhco/Mt4=";
  makeCacheWritable = true;
  installPhase = ''
    runHook preInstall

    mkdir -p $out/share
    cp -r dist $out/share/aikadm-frontend

    runHook postInstall
  '';
  meta = {
    description = "aikadm-frontend is a frontend for the aikadm project";
    homepage = "https://github.com/HumXC/aikadm-frontend";
    license = lib.licenses.gpl3Only;
    maintainers = with lib.maintainers; [winter];
  };
}
