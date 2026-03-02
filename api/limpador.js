/**
 * Projeto Nexus - Extrator de Links Dinâmicos
 * Versão: 1.3
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      // O link da página do player que você abriu no navegador
      const urlPagina = 'INSIRA_AQUI_O_LINK_DA_PAGINA_ONDE_VOCE_DEU_F12';
      
      const resposta = await fetch(urlPagina, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://pobreflix.biz/' // Ajuda a enganar o site fingindo que somos um humano
        }
      });
      
      const html = await resposta.text();

      // MIRA LASER: Procura links que começam com https e contém .m3u8 e o token ?t=
      const radarHDS = /(https:\/\/[^\s"'<>]+edge[^\s"'<>]+.m3u8\?t=[^\s"'<>]+)/i;
      const encontrado = html.match(radarHDS);

      if (encontrado && encontrado[0]) {
        // Redireciona para o link fresco capturado na hora
        return res.redirect(encontrado[0]);
      } else {
        // Se falhar, vamos imprimir o HTML para você ver o que o robô recebeu
        return res.send("O robô não achou o link. Verifique se o link da página no código está correto.");
      }

    } catch (erro) {
      return res.status(500).send('Erro na invasão: ' + erro.message);
    }
  }

  // Teste padrão
  if (id === 'filmeteste') {
    return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  }

  res.status(404).send('ID não encontrado.');
}
