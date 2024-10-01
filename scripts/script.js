let tarefas = [];

function adicionarTarefa() {
    const input = document.getElementById("tarefa-text");
    const tarefaTexto = input.value.trim();

    if (tarefaTexto === '') {
        alert("VOCÊ TENTOU ADICIONAR UMA TAREFA SEM TEXTO");
        return;
    }

    const novaTarefa = {
        id: Math.floor(Math.random() * 1000000),
        text: tarefaTexto,
        completed: false
    };

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
    input.value = "";
    input.focus();
}

function render() {
    const listaTarefas = document.getElementById("lista-tarefa");
    listaTarefas.innerHTML = "";

    tarefas.forEach(tarefa => {
        const li = document.createElement("li");
        if (tarefa.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = tarefa.text;

        const concluir = document.createElement("span");
        concluir.textContent = "task_alt";
        concluir.classList.add("check", "material-symbols-outlined");
        concluir.setAttribute("onclick", `trocaConcluir(${tarefa.id})`);

        const edit = document.createElement("span");
        edit.textContent = "edit_note";
        edit.classList.add("edit", "material-symbols-outlined");
        edit.setAttribute("onclick", `editarTarefa(${tarefa.id})`);

        const deletar = document.createElement("span");
        deletar.textContent = "delete";
        deletar.classList.add("delete", "material-symbols-outlined");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefa.id})`);

        const div = document.createElement("div");
        div.style.display = 'flex';
        div.style.marginTop = '2px';

        div.appendChild(concluir);
        div.appendChild(edit);
        div.appendChild(deletar);

        li.appendChild(span);
        li.appendChild(div);

        listaTarefas.appendChild(li);
    });
}

function trocaConcluir(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    tarefas[index].completed = !tarefas[index].completed;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
}

function editarTarefa(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const novoTextoTarefa = prompt('Edite a tarefa', tarefas[index].text);

    if (novoTextoTarefa !== null && novoTextoTarefa.trim() !== '') {
        tarefas[index].text = novoTextoTarefa;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
        render();
    }
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    render();
}

function addPeloEnter(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
}

function carregarTarefas() {
    const tarefasLocalStore = localStorage.getItem("tarefas");
    if (tarefasLocalStore) {
        tarefas = JSON.parse(tarefasLocalStore);
        render();
    }
}
