export const witness = (witnessObj) => {
    return `
                <section class="witness" id="witness-${witnessObj.id}">
                <h2>${witnessObj.name}</h2>
                    <p class="witness-statement">Statments: ${witnessObj.statements}</p>
                </section>
                `
    }