document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Menu
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      toggle.classList.remove('is-open');
    };
    const openMenu = () => {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('no-scroll');
      toggle.classList.add('is-open');
    };
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  // Cookie bar
  const cookieBar = document.getElementById('cookieBar');
  const cookieAccept = document.getElementById('cookieAccept');
  if (cookieBar && cookieAccept) {
    const key = 'cookie.accepted.v1';
    const accepted = localStorage.getItem(key);
    if (!accepted) {
      requestAnimationFrame(() => cookieBar.classList.add('show'));
    }
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(key, '1');
      cookieBar.classList.remove('show');
    });
  }

  // Lead form
  const form = document.getElementById('leadForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const requiredFields = ['nome', 'telefone', 'assunto', 'lgpd'];
      for (const field of requiredFields) {
        const value = formData.get(field);
        if (!value || (field === 'lgpd' && form.querySelector('#lgpd') && !form.querySelector('#lgpd').checked)) {
          status.textContent = 'Por favor, preencha os campos obrigatórios.';
          status.style.color = '#e03b3b';
          return;
        }
      }

      try {
        form.querySelector('button[type="submit"]').disabled = true;
        form.querySelector('button[type="submit"]').textContent = 'Enviando...';

        // Simulação de envio. Substitua por sua API, Google Apps Script, Formspree, etc.
        await new Promise(r => setTimeout(r, 800));

        // Exemplo de integração com WhatsApp após envio
        const phone = '5511999999999';
        const text = encodeURIComponent(`Olá, sou ${data.nome}. Assunto: ${data.assunto}. Telefone: ${data.telefone}. Email: ${data.email || ''}. Mensagem: ${data.mensagem || ''}`);
        status.textContent = 'Enviado com sucesso! Vamos te responder em breve.';
        status.style.color = '#2fbf71';
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
        form.reset();
      } catch (err) {
        console.error(err);
        status.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
        status.style.color = '#e03b3b';
      } finally {
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Quero falar com um advogado';
        }
      }
    });
  }
});


