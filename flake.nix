{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    flake-utils,
    nixpkgs,
    ...
  }:
    flake-utils.lib.eachSystem ["x86_64-linux"] (
      system: let
        pkgs = import nixpkgs {
          inherit system;
        };
      in {
        packages.html-greet-frontend = pkgs.callPackage ./package.nix {};
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            tailwindcss
            tailwindcss-language-server
            vue-language-server
          ];
        };
      }
    );
}
