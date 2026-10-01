document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-icon');

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      // Alterna o item clicado
      if (!isActive) {
        item.classList.add('active');
        icon.textContent = '×';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value || 'Não informado';
      const material = document.getElementById('material').value;
      const quantity = document.getElementById('quantity').value || 'Não informada';
      const service = document.getElementById('service').value;
      const details = document.getElementById('details').value;

      // Monta a mensagem para o WhatsApp
      const message = `*NOVO PEDIDO DE ORÇAMENTO - CANELA VERDE*%0A%0A` +
        `*Nome:* ${name}%0A` +
        `*Telefone:* ${phone}%0A` +
        `*E-mail:* ${email}%0A` +
        `*Material/Peça:* ${material}%0A` +
        `*Quantidade/Dimensões:* ${quantity}%0A` +
        `*Serviço:* ${service}%0A` +
        `*Detalhes:* ${details}`;

      const whatsappNumber = '5527992325642';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abre o WhatsApp numa nova aba
      window.open(whatsappUrl, '_blank');
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btnOrcamento = document.getElementById('btn-orcamento');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const modal = document.getElementById('modal-orcamento');
  const formOrcamento = document.getElementById('form-orcamento');

  // Abre a janela flutuante ao clicar em ORÇAMENTO
  btnOrcamento.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('ativo');
  });

  // Fecha o modal ao clicar no botão de fechar (X)
  btnFecharModal.addEventListener('click', () => {
    modal.classList.remove('ativo');
  });

  // Fecha o modal ao clicar fora da caixa do formulário
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('ativo');
    }
  });

  // Dispara o envio dos dados do formulário direto para o WhatsApp
  formOrcamento.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const observacoes = document.getElementById('observacoes').value;

    const numeroWhats = '5527992325642';

    // Monta a mensagem formatada para o WhatsApp
    const mensagem = `*SOLICITAÇÃO DE ORÇAMENTO*%0A%0A` +
                     `*Nome:* ${encodeURIComponent(nome)}%0A` +
                     `*Telefone:* ${encodeURIComponent(telefone)}%0A` +
                     `*E-mail:* ${encodeURIComponent(email)}%0A` +
                     `*Observações:* ${encodeURIComponent(observacoes || 'Nenhuma')}`;

    window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');

    formOrcamento.reset();
    modal.classList.remove('ativo');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.portfolio-tabs .tab-btn');
  const blocks = document.querySelectorAll('.category-block');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Remove o destaque (linha verde) de todas as abas e ativa a clicada
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 2. Pega a categoria vinculada ao botão (ex: "todos", "cat1", "cat2"...)
      const selectedCategory = tab.getAttribute('data-category');

      // 3. Exibe apenas os blocos correspondentes
      blocks.forEach(block => {
        const blockCategory = block.getAttribute('data-category');

        if (selectedCategory === 'todos' || blockCategory === selectedCategory) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const btnConhecerEstrutura = document.getElementById('btn-conhecer-estrutura');
  const modalEstrutura = document.getElementById('modal-estrutura');
  const btnFecharEstrutura = document.getElementById('btn-fechar-estrutura');
  const videoEstrutura = document.getElementById('video-estrutura');

  if (btnConhecerEstrutura && modalEstrutura) {
    const fecharEPararVideo = () => {
      modalEstrutura.classList.remove('ativo');

      setTimeout(() => {
        if (videoEstrutura) {
          videoEstrutura.pause();
          videoEstrutura.currentTime = 0; // Reseta o tempo do vídeo para o início ao fechar
        }
      }, 300);
    };

    btnConhecerEstrutura.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (videoEstrutura) {
        videoEstrutura.currentTime = 0; // Garante que começa do 0:00 ao abrir
        videoEstrutura.play();
      }
      
      modalEstrutura.classList.add('ativo');
    });

    if (btnFecharEstrutura) {
      btnFecharEstrutura.addEventListener('click', fecharEPararVideo);
    }

    modalEstrutura.addEventListener('click', (e) => {
      if (e.target === modalEstrutura) {
        fecharEPararVideo();
      }
    });
  }
});