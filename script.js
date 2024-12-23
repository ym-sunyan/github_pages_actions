let simplemde;

document.addEventListener('DOMContentLoaded', () => {
    simplemde = new SimpleMDE({ element: document.getElementById('markdown-editor') });
    listNotes();
});

function showEditor() {
    document.getElementById('note-title').style.display = 'block';
    document.getElementById('markdown-editor').style.display = 'block';
    document.getElementById('save-button').style.display = 'block';
    document.getElementById('notes-list').style.display = 'none';
}

function saveNote() {
    const title = document.getElementById('note-title').value.trim();
    if (!title) {
        alert('Please enter a title for the note.');
        return;
    }

    const content = simplemde.value();
    const note = {
        title: title,
        content: content,
        createTime: new Date().toISOString()
    };

    // Save note to localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    // Save note to file
    saveNoteToFile(note);

    alert('Note saved!');
    simplemde.value('');
    document.getElementById('note-title').value = '';
    listNotes();
}

function saveNoteToFile(note) {
    const fileName = `notes/${note.title}.html`;
    const fileContent = `
        <html>
        <head>
            <title>${note.title}</title>
        </head>
        <body>
            ${note.content}
        </body>
        </html>
    `;

    // Use a server-side script or API to save the file
    fetch('/save-note', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileName, fileContent })
    })
    .then(response => response.json())
    .then(data => {
        console.log('File saved:', data);
    })
    .catch(error => {
        console.error('Error saving file:', error);
    });
}

function listNotes() {
    document.getElementById('note-title').style.display = 'none';
    document.getElementById('markdown-editor').style.display = 'none';
    document.getElementById('save-button').style.display = 'none';
    document.getElementById('notes-list').style.display = 'block';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <div>
                <strong>Note ${index + 1}</strong> - ${new Date(note.createTime).toLocaleString()}
            </div>
            <button onclick="showNoteContent(${index})">显示内容</button>
        `;
        notesList.appendChild(noteDiv);
    });
}

function showNoteContent(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes[index];
    simplemde.value(note.content);
    showEditor();
}
