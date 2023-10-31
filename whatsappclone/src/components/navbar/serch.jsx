function Serchf(data,query) {
    let final
    if (query == "" || query == " ") {
        final=data
    }
    else {
        const finall = data.filter(e => {
            if (e.title.toLowerCase().includes(query.toLowerCase())) {
                return e;
            }
        })
        final=finall
    }

    return final;
}

export default Serchf