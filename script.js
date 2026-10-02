/* ==========================================================================
   1. ACORDEÃO DE PERGUNTAS FREQUENTES (FAQ)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona todos os itens do FAQ
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-icon');

    // Ao clicar na pergunta do FAQ
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todas as outras perguntas abertas para manter o visual limpo
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      });

      // Se a pergunta clicada não estava aberta, abre e muda o ícone para '×'
      if (!isActive) {
        item.classList.add('active');
        if (icon) icon.textContent = '×';
      }
    });
  });
});


/* ==========================================================================
   2. FORMULÁRIO PRINCIPAL DE ORÇAMENTO DA PÁGINA (quoteForm)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const quoteForm = document.getElementById('quoteForm');

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      // Impede o recarregamento padrão da página
      e.preventDefault();

      // Coleta os valores digitados pelos clientes
      const name = document.getElementById('name').value;
      const phone = document.getElementById('phone').value;
      const email = document.getElementById('email').value || 'Não informado';
      const material = document.getElementById('material').value;
      const quantity = document.getElementById('quantity').value || 'Não informada';
      const service = document.getElementById('service').value;
      const details = document.getElementById('details').value;

      // Monta a mensagem formatada para envio no WhatsApp
      const message = `*NOVO PEDIDO DE ORÇAMENTO - CANELA VERDE*%0A%0A` +
        `*Nome:* ${encodeURIComponent(name)}%0A` +
        `*Telefone:* ${encodeURIComponent(phone)}%0A` +
        `*E-mail:* ${encodeURIComponent(email)}%0A` +
        `*Material/Peça:* ${encodeURIComponent(material)}%0A` +
        `*Quantidade/Dimensões:* ${encodeURIComponent(quantity)}%0A` +
        `*Serviço:* ${encodeURIComponent(service)}%0A` +
        `*Detalhes:* ${encodeURIComponent(details)}`;

      const whatsappNumber = '5527992325642';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abre a conversa no WhatsApp em uma nova aba
      window.open(whatsappUrl, '_blank');

      // CORREÇÃO: Limpa todos os campos do formulário principal imediatamente
      quoteForm.reset();
    });
  }
});


/* ==========================================================================
   3. JANELA FLUTUANTE (MODAL) DE ORÇAMENTO RÁPIDO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const btnOrcamento = document.getElementById('btn-orcamento');
  const btnFecharModal = document.getElementById('btn-fechar-modal');
  const modal = document.getElementById('modal-orcamento');
  const formOrcamento = document.getElementById('form-orcamento');

  // Abre a janela flutuante de orçamento
  if (btnOrcamento && modal) {
    btnOrcamento.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('ativo');
    });
  }

  // Fecha o modal ao clicar no botão (X)
  if (btnFecharModal && modal) {
    btnFecharModal.addEventListener('click', () => {
      modal.classList.remove('ativo');
    });
  }

  // Fecha o modal ao clicar fora da caixa do formulário (na área escura)
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('ativo');
      }
    });
  }

  // Dispara o envio do formulário do Modal para o WhatsApp
  if (formOrcamento) {
    formOrcamento.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value;
      const telefone = document.getElementById('telefone').value;
      const email = document.getElementById('email').value;
      const observacoes = document.getElementById('observacoes').value;

      const numeroWhats = '5527992325642';

      const mensagem = `*SOLICITAÇÃO DE ORÇAMENTO*%0A%0A` +
                       `*Nome:* ${encodeURIComponent(nome)}%0A` +
                       `*Telefone:* ${encodeURIComponent(telefone)}%0A` +
                       `*E-mail:* ${encodeURIComponent(email)}%0A` +
                       `*Observações:* ${encodeURIComponent(observacoes || 'Nenhuma')}`;

      // Abre o WhatsApp
      window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');

      // Limpa os campos e fecha a janela flutuante após o envio
      formOrcamento.reset();
      if (modal) modal.classList.remove('ativo');
    });
  }
});


/* ==========================================================================
   4. FILTRO DE CATEGORIAS DO PORTFÓLIO
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.portfolio-tabs .tab-btn');
  const blocks = document.querySelectorAll('.category-block');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Destaque do botão clicado (adiciona classe active)
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // 2. Identifica qual categoria foi selecionada
      const selectedCategory = tab.getAttribute('data-category');

      // 3. Mostra ou oculta os blocos de fotos do portfólio
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


/* ==========================================================================
   5. JANELA FLUTUANTE (MODAL) DO VÍDEO "CONHECER ESTRUTURA"
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const btnConhecerEstrutura = document.getElementById('btn-conhecer-estrutura');
  const modalEstrutura = document.getElementById('modal-estrutura');
  const btnFecharEstrutura = document.getElementById('btn-fechar-estrutura');
  const videoEstrutura = document.getElementById('video-estrutura');

  if (btnConhecerEstrutura && modalEstrutura) {
    // Função para fechar a janela e pausar/resetar o vídeo
    const fecharEPararVideo = () => {
      modalEstrutura.classList.remove('ativo');

      setTimeout(() => {
        if (videoEstrutura) {
          videoEstrutura.pause();
          videoEstrutura.currentTime = 0; // Volta o vídeo para o segundo 0:00
        }
      }, 300);
    };

    // Abre a janela e dá play no vídeo desde o início
    btnConhecerEstrutura.addEventListener('click', (e) => {
      e.preventDefault();

      if (videoEstrutura) {
        videoEstrutura.currentTime = 0;
        videoEstrutura.play();
      }

      modalEstrutura.classList.add('ativo');
    });

    // Eventos para fechar ao clicar no botão de fechar ou fora da janela
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