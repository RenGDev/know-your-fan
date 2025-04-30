export function Form(){
    return(
        <form action="">
            <label htmlFor="name">Nome completo</label>
            <input type="text" name="name" id="name"/>

            <label htmlFor="cpf">CPF</label>
            <input type="text" name="cpf" id="cpf"/>

            <label htmlFor="address">Endereço</label>
            <input type="text" name="address" id="address"/>

            <label htmlFor="address">Endereço</label>
            <input type="text" name="address" id="address"/>

            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email"/>

            <input type="submit" value="Avançar" />
        </form>
    )
}