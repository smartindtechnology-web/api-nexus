/**
 * Projeto Nexus - Extrator Inteligente
 * Versão: 1.5
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      const urlPagina = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0'; // <--- Link que você abre no navegador
      
      const resposta = await fetch(urlPagina, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://pobreflix.biz/'
        }
      });
      
      const html = await resposta.text();

      // RADAR 1: Tenta achar o link direto (o que você mandou)
      const radarDireto = /(https:\/\/[^\s"'<>]+.m3u8[^\s"'<>]*)/i;
      
      // RADAR 2: Tenta achar links codificados ou em JSON
      const radarJSON = /"(https:[^"]+\.m3u8[^"]*)"/i;

      const encontrado = html.match(radarDireto) || html.match(radarJSON);

      if (encontrado && encontrado[1]) {
        return res.redirect(encontrado[1].replace(/\\/g, '')); // Limpa barras extras se for JSON
      } else if (encontrado && encontrado[0]) {
        return res.redirect(encontrado[0]);
      } else {
        // MODO DEBUG: Se falhar, ele cospe os primeiros 500 caracteres do site para a gente ver o que tem lá
        return res.send("HTML Capturado (Início): " + html.substring(0, 500));
      }

    } catch (erro) {
      return res.status(500).send('Erro: ' + erro.message);
    }
  }

  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  res.status(404).send('ID não encontrado.');
}
