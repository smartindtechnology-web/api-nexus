/**
 * Projeto Nexus - Extrator Camuflado
 * Versão: 1.6
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      const urlPagina = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0'; 
      
      const resposta = await fetch(urlPagina, {
        headers: {
          // Identidade de um navegador Chrome atualizado
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          // O segredo: Dizemos que já estamos no site do player
          'Origin': 'https://pobreflix.biz',
          'Referer': 'https://pobreflix.biz/',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      });
      
      const html = await resposta.text();

      // Radar aprimorado para pegar o link m3u8 mesmo se houver caracteres de escape (\\)
      const radar = /(https:[^"'\s<>]+?\.m3u8[^"'\s<>]*)/i;
      const encontrado = html.match(radar);

      if (encontrado && encontrado[0]) {
        // Limpa barras invertidas que o JSON às vezes coloca
        const linkFinal = encontrado[0].replace(/\\/g, '');
        return res.redirect(linkFinal);
      } else {
        // Se ainda falhar, vamos ver se o HTML que veio agora é diferente
        return res.send("HTML Recebido (Primeiros 300 caracteres): " + html.substring(0, 300));
      }

    } catch (erro) {
      return res.status(500).send('Erro na extração: ' + erro.message);
    }
  }

  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
  res.status(404).send('ID não encontrado.');
}
