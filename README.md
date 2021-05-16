## Usar la capa del mapa de Open Street map para Ciclistas

## Como manejar las comunicaciones con este ifram 
[Tutorial](https://htmldom.dev/communication-between-an-iframe-and-its-parent-window/)


## Recibir información cuando se embebe en un iframe

```html
<!-- Coloque el mapa en su página -->
<iframe src="file:///mnt/SharedData/Downloads/Code/bikeOpen/index.html" 
    width="100%"
    height="100%"
    frameborder="0"
></iframe>

<script>
    document.addEventListener('DOMContentLoaded', function() {
    const messageEle = document.getElementById('message');
    //Evento para recibir la comunicación del iframe 
    window.addEventListener('message', function(e) {
            const data = JSON.parse(e.data);
            console.log(`latitude: "${data.latitude}", longitude: ${data.longitude}`)
        });
    });
</script>
```
