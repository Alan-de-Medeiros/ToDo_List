var tarefas = [];

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
    }

    tarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    render()
    input.value = "";
    input.focus();
}

function render() {
    const listaTarefas = document.getElementById("lista-tarefa");
    listaTarefas.innerHTML = "";

    for (var i = 0; i < tarefas.length; i++) {
        const li = document.createElement("li");
        if (tarefas[i].completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = tarefas[i].text;

        const concluir = document.createElement("button");
        concluir.classList.add("check");
        concluir.setAttribute("onclick", `trocaConcluir(${tarefas[i].id})`);
        concluir.innerHTML = `<span class="material-icons">${tarefas[i].completed ? 'undo' : 'check'}</span>`;

        const edit = document.createElement("button");
        edit.classList.add("edit");
        edit.setAttribute("onclick", `editarTarefa(${tarefas[i].id})`);
        edit.innerHTML = `<span class="material-icons">edit</span>`;

        const deletar = document.createElement("button");
        deletar.classList.add("delete");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefas[i].id})`);
        deletar.innerHTML = `<span class="material-icons">delete</span>`;

        const div = document.createElement("div");
        div.appendChild(concluir);
        div.appendChild(edit);
        div.appendChild(deletar);

        li.appendChild(span);
        li.appendChild(div);
        listaTarefas.appendChild(li);
    }
}


function deletarTarefa(id){
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    render();
}

function addPeloEnter(evento){
    if(evento.key === 'Enter'){
        adicionarTarefa();
    }
}

function carregarTarefas() {
    const tarefasLocalStore = localStorage.getItem("tarefas");
    if(tarefasLocalStore){
        tarefas = JSON.parse(tarefasLocalStore);
        render();
    }
}