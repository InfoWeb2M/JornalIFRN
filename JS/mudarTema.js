document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const botao = document.getElementById('toggle-tema');
  const icone = document.getElementById('icone');

  // SVGs no formato path
  const sol = "M12 4 a8 8 0 1 0 0 16 a8 8 0 1 0 0-16 M12 1 L12 4 M12 20 L12 23 M4.22 4.22 L6.34 6.34 M17.66 17.66 L19.78 19.78 M1 12 L4 12 M20 12 L23 12 M4.22 19.78 L6.34 17.66 M17.66 6.34 L19.78 4.22";
  const lua = "M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z";

  function aplicarTema(tema) {
    const img = document.querySelector('#fotoPrincipal');

    html.setAttribute('data-tema', tema);
    localStorage.setItem('tema', tema);
    icone.setAttribute('d', tema === 'claro' ? sol : lua);

    // Só troca imagem se ela existir
    if (img) {
      img.setAttribute('src', `IMG/jornal${tema}.png`);
    }
  }

  // Inicializar tema salvo ou padrão
  const temaSalvo = localStorage.getItem('tema') || 'claro';
  aplicarTema(temaSalvo);

  // Alternar tema ao clicar
  if (botao) {
    botao.addEventListener('click', () => {
      const temaAtual = html.getAttribute('data-tema');
      const novoTema = temaAtual === 'claro' ? 'escuro' : 'claro';
      aplicarTema(novoTema);
    });
  }
});
