export const Facility = (facilityObj, matchingCriminals) => {
    return `<div class="facility" id="facility-${facilityObj.id}">
    <h4>${facilityObj.facilityName}</h4>
    <div class="facility__details">
        <h5>Security level: ${facilityObj.securityLevel}</h5>
        <h5>Capacity: ${facilityObj.capacity}</h5>
        <div class=contained__criminals>
            <h4 class="facility__criminals__header">Criminals</h4>
            <ul>
                ${matchingCriminals.map(criminal => `<li>${criminal.name}</li>`).join("")}
            </ul>
        </div>
    </div>
</div>`
}