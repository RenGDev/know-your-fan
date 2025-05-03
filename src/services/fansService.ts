export async function enviarFanData(data: any) {
    const res = await fetch('http://localhost:3001/fan/fans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (!res.ok) {
      const errorMsg = await res.text();
      console.error("Erro no backend:", errorMsg);
      throw new Error('Erro ao enviar dados do fã');
    }
  
    return res.json();
  }
  