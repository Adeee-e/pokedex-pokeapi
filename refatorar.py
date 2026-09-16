from pathlib import Path
import re
import shutil

raiz = Path(".")
origem = raiz / "main.js"
pasta_js = raiz / "js"

pasta_js.mkdir(exist_ok=True)

codigo = origem.read_text(encoding="utf-8")

# Backup adicional do main.js atual
backup = raiz / "main.antes-refatoracao.js"

if not backup.exists():
    shutil.copy2(origem, backup)


def trecho(inicio, fim):
    i = codigo.index(inicio)
    j = codigo.index(fim, i + len(inicio))

    return codigo[i:j].strip() + "\n"


def gravar(nome, conteudo):
    caminho = pasta_js / nome

    caminho.write_text(
        "'use strict';\n\n" + conteudo.strip() + "\n",
        encoding="utf-8"
    )


# =========================================================
# ESTADO
# =========================================================

# Como cores.js já pode ter sido retirado do main.js,
# verificamos qual é o próximo bloco existente.
fim_estado = (
    "function cores"
    if "function cores" in codigo
    else "const buscaApi"
)

gravar(
    "estado.js",
    trecho("let pagina=", fim_estado)
)


# =========================================================
# CORES
# =========================================================

# Caso cores() ainda esteja no main.js, ele será extraído.
# Caso você já tenha feito isso, o cores.js existente será mantido.

if "function cores" in codigo:

    gravar(
        "cores.js",
        trecho("function cores", "const buscaApi")
    )

elif not (pasta_js / "cores.js").exists():

    raise SystemExit(
        "ERRO: js/cores.js não existe e cores() "
        "também não está mais no main.js."
    )


# =========================================================
# API
# =========================================================

gravar(
    "api.js",
    trecho(
        "async function infoPokemons",
        "function criarContainer"
    )
)


# =========================================================
# LISTAGEM
# =========================================================

listagem = (
    trecho(
        "const buscaApi",
        "async function infoPokemons"
    )
    + "\n"
    + trecho(
        "function criarContainer",
        "function retroceder"
    )
)

gravar(
    "listagem.js",
    listagem
)


# =========================================================
# PAGINAÇÃO
# =========================================================

gravar(
    "paginacao.js",
    trecho(
        "function retroceder",
        "async function filtros"
    )
)


# =========================================================
# FILTROS
# =========================================================

gravar(
    "filtros.js",
    trecho(
        "async function filtros",
        "// Pop up de informações"
    )
)


# =========================================================
# POPUP
# =========================================================

popup = (
    trecho(
        "function ClosePopUpInfo",
        "function limparComparacao"
    )
    + "\n"
    + trecho(
        "function expandirMegas",
        "async function comparar"
    )
)

gravar(
    "popup.js",
    popup
)


# =========================================================
# COMPARAÇÃO
# =========================================================

comparacao = (
    trecho(
        "function limparComparacao",
        "function expandirMegas"
    )
    + "\n"
    + trecho(
        "async function comparar",
        "\nbuscaApi();"
    )
)

gravar(
    "comparacao.js",
    comparacao
)


# =========================================================
# MAIN
# =========================================================

gravar(
    "main.js",
    "buscaApi();\n"
)


# =========================================================
# INDEX.HTML
# =========================================================

html_path = raiz / "index.html"

html = html_path.read_text(
    encoding="utf-8"
)

scripts_existentes = [
    "main.js",
    "js/estado.js",
    "js/cores.js",
    "js/api.js",
    "js/listagem.js",
    "js/paginacao.js",
    "js/filtros.js",
    "js/popup.js",
    "js/comparacao.js",
    "js/main.js",
]

# Remove referências anteriores para evitar duplicação
for src in scripts_existentes:

    padrao = (
        rf'\s*<script\s+src=["\']'
        rf'{re.escape(src)}'
        rf'["\']\s*></script>\s*'
    )

    html = re.sub(
        padrao,
        "\n",
        html
    )


scripts = """
    <script src="js/estado.js"></script>
    <script src="js/cores.js"></script>
    <script src="js/api.js"></script>
    <script src="js/listagem.js"></script>
    <script src="js/paginacao.js"></script>
    <script src="js/filtros.js"></script>
    <script src="js/popup.js"></script>
    <script src="js/comparacao.js"></script>
    <script src="js/main.js"></script>
"""


if "</body>" not in html:

    raise SystemExit(
        "ERRO: </body> não encontrado no index.html."
    )


html = html.replace(
    "</body>",
    scripts + "</body>"
)


html_path.write_text(
    html,
    encoding="utf-8"
)


print("")
print("Refatoração concluída.")
print("")
print("Backup criado:")
print("  main.antes-refatoracao.js")
print("")
print("Arquivos em js/:")
print("  estado.js")
print("  cores.js")
print("  api.js")
print("  listagem.js")
print("  paginacao.js")
print("  filtros.js")
print("  popup.js")
print("  comparacao.js")
print("  main.js")
