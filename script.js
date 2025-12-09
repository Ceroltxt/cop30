// Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Carregar dados do JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Preencher agenda
        const agendaContainer = document.getElementById('agenda-cards');
        data.agenda.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${item.titulo}</h3><p>${item.descricao}</p>`;
            card.addEventListener('click', () => openModal(item.titulo, item.detalhes));
            agendaContainer.appendChild(card);
        });

        // Preencher palestrantes
        const palestrantesContainer = document.getElementById('palestrantes-cards');
        data.palestrantes.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `<h3>${item.nome}</h3><p>${item.bio}</p>`;
            card.addEventListener('click', () => openModal(item.nome, item.detalhes));
            palestrantesContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Erro! Droga!:', error));

// Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close');

function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.display = 'block';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
};

// Validação do formulário
const form = document.getElementById('registration-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const uf = document.getElementById('uf').value;
    const interesses = Array.from(document.querySelectorAll('input[name="interesse"]:checked')).map(cb => cb.value);

    if (!nome || !email || !uf || interesses.length === 0) {
        alert('Preencha todos os campos obrigatórios.');
        return;
    }

    alert('Inscrição enviada com sucesso! Obrigado por se juntar à COP30.');
    form.reset();
});