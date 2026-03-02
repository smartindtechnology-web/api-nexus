/**
 * Projeto Nexus - Injetor de Identidade (Bypass IP)
 * Versão: 2.2
 */
export default async function handler(req, res) {
  // Permissões de acesso para o App Nexus
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  const { id } = req.query;

  if (id === 'homem-aranha') {
    try {
      // 1. LINK DA PÁGINA DO FILME (Certifique-se de que este link é o do player)
      const urlPagina = 'https://edge1-waw-sprintcdn.r66nv9ed.com/hls2/09/10880/50erk3ov4j9m_o/index-v1-a1.m3u8?t=9Oh9a2prRTpeTTAtNVmyN46OOwYyDwiD9SbTSuAf460&s=1772452814&e=10800&f=54400043&srv=1050&asn=&sp=4000&p=0'; 
      
      const headersComuns = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://pobreflix.biz/',
        'Origin': 'https://pobreflix.biz'
      };

      // 2. O Robô entra no site com "Disfarce de Humano"
      const resposta = await fetch(urlPagina, { headers: headersComuns });
      const html = await resposta.text();

      // 3. Procuramos o link .m3u8 (mesmo se estiver escondido/codificado)
      const radar = /(https:[^"'\s<>]+?\.m3u8[^"'\s<>]*)/i;
      const encontrado = html.match(radar);

      if (encontrado && encontrado[0]) {
        let linkFinal = encontrado[0].replace(/\\/g, '');

        // 4. O PULO DO GATO: Em vez de Redirecionar, vamos entregar o CONTEÚDO
        // Isso faz o servidor do filme pensar que o Vercel é quem está assistindo
        const stream = await fetch(linkFinal, { headers: headersComuns });
        const dadosM3U8 = await stream.text();

        // 5. Entregamos o arquivo M3U8 pronto para o VLC
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        return res.send(dadosM3U8);

      } else {
        return res.status(404).send("Link não encontrado ou expirado.");
      }

    } catch (erro) {
      return res.status(500).send('Erro no Sistema: ' + erro.message);
    }
  }

  // Record e Teste permanecem como backup
  if (id === 'record') return res.redirect('https://cdn.jmvstream.com/w/LVW-10842/LVW10842_513N26MDBL/chunklist.m3u8');
  if (id === 'filmeteste') return res.redirect('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');

  res.status(404).send('ID Nexus Inválido.');
}
