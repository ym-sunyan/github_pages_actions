document.addEventListener('DOMContentLoaded', () => {
    fetch('notes_data/datas.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            Object.values(data).forEach(node => {
                // 创建一个div来显示HTML内容
                const htmlDiv = document.createElement('div');
                htmlDiv.innerHTML = node.htmlContent;
                contentDiv.appendChild(htmlDiv);

                // 提取HTML中的文本内容
                const textContent = htmlDiv.textContent || htmlDiv.innerText || '';
                const textDiv = document.createElement('div');
                textDiv.textContent = `Extracted Text: ${textContent}`;
                contentDiv.appendChild(textDiv);

                // 显示创建时间
                const timePara = document.createElement('p');
                timePara.textContent = `Created Time: ${new Date(node.create_time).toLocaleString()}`;
                contentDiv.appendChild(timePara);
            });
        })
        .catch(error => console.error('Error fetching datas.json:', error));
});
