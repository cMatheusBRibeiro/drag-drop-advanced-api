const cols = document.querySelectorAll('.col')
const rows = document.querySelectorAll('.row')
const main = document.querySelector('.principal')

cols.forEach(col => {
    col.addEventListener('dragstart', (e) => {
        if (e.target == col)
            col.classList.add('dragging')
    })

    col.addEventListener('dragend', (e) => {
        if (e.target == col)
            col.classList.remove('dragging')
    })
})

rows.forEach(row => {
    row.addEventListener('dragstart', (e) => {
        if (e.target == row)
            row.classList.add('dragging')
    })

    row.addEventListener('dragend', (e) => {
        if (e.target == row)
            row.classList.remove('dragging')
    })

    row.addEventListener('dragover', e => {
        e.preventDefault()
        
        const col = document.querySelector('.col.dragging')
        if(col == null)
            return

        const afterElement = getDragAfterElementX(row, e.clientX)

        if(afterElement == null)
            row.appendChild(col)
        else
            row.insertBefore(col, afterElement)
    })
})

main.addEventListener('dragover', e => {
    e.preventDefault()

    const row = document.querySelector('.row.dragging')
    if(row == null)
        return

    const afterElement = getDragAfterElementY(main, e.clientY)

    if(afterElement == null)
        main.appendChild(row)
    else
        main.insertBefore(row, afterElement)
})

function getDragAfterElementX(row, x) {
    const colsElements = [...row.querySelectorAll('.col:not(.dragging)')]

    return colsElements.reduce((closest, child) => {
        const col = child.getBoundingClientRect()
        const offset = x - col.left - col.width / 2

        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child }
        return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

function getDragAfterElementY(main, y) {
    const rowsElements = [...main.querySelectorAll('.row:not(.dragging)')]

    return rowsElements.reduce((closest, child) => {
        const row = child.getBoundingClientRect()
        const offset = y - row.top - row.height / 2

        if (offset < 0 && offset > closest.offset)
            return { offset: offset, element: child }
        return closest
    }, { offset: Number.NEGATIVE_INFINITY }).element
}