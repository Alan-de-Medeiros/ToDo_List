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
    };

    tarefas.push(novaTarefa);
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

        const concluir = document.createElement("button");
        concluir.textContent = tarefa.completed ? "Desmarcar" : "Concluir";
        concluir.classList.add("check");
        concluir.setAttribute("onclick", `trocaConcluir(${tarefa.id})`);
        
        const concluirIcon = document.createElement("span");
        concluirIcon.classList.add("material-symbols-outlined");
        concluirIcon.textContent = "check_circle"; 
        concluir.appendChild(concluirIcon);

        const edit = document.createElement("button");
        edit.textContent = "Editar";
        edit.classList.add("edit");
        edit.setAttribute("onclick", `editarTarefa(${tarefa.id})`);

        const editIcon = document.createElement("span");
        editIcon.classList.add("material-symbols-outlined");
        editIcon.textContent = "edit";
        edit.appendChild(editIcon);

        const deletar = document.createElement("button");
        deletar.textContent = "Deletar";
        deletar.classList.add("delete");
        deletar.setAttribute("onclick", `deletarTarefa(${tarefa.id})`);

        const deleteIcon = document.createElement("span");
        deleteIcon.classList.add("material-symbols-outlined");
        deleteIcon.textContent = "delete";
        deletar.appendChild(deleteIcon);

        const div = document.createElement("div");
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
    render();
}

function editarTarefa(id) {
    const index = tarefas.findIndex(tarefa => tarefa.id === id);
    const novoTextoTarefa = prompt('Edite a Tarefa', tarefas[index].text);

    if (novoTextoTarefa !== null && novoTextoTarefa.trim() !== '') {
        tarefas[index].text = novoTextoTarefa;
        render();
    }
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    render();
}

function addPeloEnter(evento){
    if(evento.key === 'Enter'){
        adicionarTarefa();
}
}