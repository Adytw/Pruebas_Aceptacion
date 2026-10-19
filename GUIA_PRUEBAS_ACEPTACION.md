# Guía de ejecución: prueba de aceptación del carrito

## Qué valida

La prueba comprueba un requisito visto desde la perspectiva del cliente:
agregar dos cuadernos de `$10.00` y ver dos artículos, un subtotal de
`$20.00` y un total de `$20.00`.

El escenario está escrito en Gherkin en `features/carrito.feature`. Cucumber
lo ejecuta y Playwright abre `index.html` en Chromium, pulsa los botones
visibles de la tienda y comprueba los valores presentados. Por eso se valida
el comportamiento del producto a través de la interfaz real, no solamente la
función que calcula el total. Si algún resultado no coincide, la prueba falla
y el pipeline reporta el fallo.

## Herramientas y motivo de uso

| Herramienta | Para qué se usa |
|---|---|
| Node.js y npm | Ejecutan las pruebas e instalan las dependencias definidas en `package-lock.json`. |
| Gherkin | Expresa el criterio de aceptación con los pasos `Dado`, `Cuando` y `Entonces`, legibles para personas técnicas y no técnicas. |
| Cucumber.js | Convierte el escenario en pasos ejecutables y presenta cuántos escenarios y pasos pasaron o fallaron. |
| Playwright y Chromium | Abren la tienda en un navegador, interactúan con los controles y verifican lo que ve el cliente. |
| GitHub Actions | Ejecuta el mismo conjunto de pruebas automáticamente en `push` o pull request a `main`, o manualmente desde GitHub. |
| Reporte HTML | Guarda el resultado detallado del escenario y una captura de la página como evidencia. |

## Requisitos

- Windows, macOS o Linux.
- Git.
- Node.js 20 o posterior y npm.
- Acceso al repositorio de GitHub para descargar el proyecto.

## Descargar e instalar el proyecto

Abre PowerShell y ejecuta:

```powershell
git clone https://github.com/DEYA7276/Pruebas_Aceptacion.git
Set-Location .\Pruebas_Aceptacion
npm ci
npx playwright install chromium
```

`npm ci` instala las versiones exactas que aparecen en `package-lock.json`.
El comando de Playwright instala el navegador Chromium que usa la prueba
automatizada. Es necesario repetir `npm ci` y la instalación de Chromium
después de clonar en una máquina nueva.

## Abrir la tienda manualmente

Desde la carpeta del proyecto, ejecuta:

```powershell
Start-Process .\index.html
```

La página también puede abrirse desde el Explorador de archivos con doble clic
en `index.html`. En el navegador, pulsa dos veces **Agregar** en el producto
**Cuaderno**. Debes observar `2` artículos y `$20.00` en el subtotal y el
total. Usa **Vaciar carrito** para volver al estado inicial.

## Ejecutar la prueba automatizada

Desde la carpeta raíz del proyecto:

```powershell
npm test
```

El comando abre Chromium sin ventana visible, recorre el escenario y muestra
el resumen en la terminal. El resultado exitoso esperado es:

```text
1 scenario (1 passed)
3 steps (3 passed)
```

Para guardar un reporte HTML con la evidencia:

```powershell
npm run test:report
```

El archivo generado es `reports/uat-report.html`. Ábrelo para consultar el
escenario, el estado de los pasos y la captura de pantalla. El reporte es un
resultado generado y está excluido del control de versiones; se puede volver
a crear ejecutando el comando anterior.

## Ejecutar en GitHub Actions

El flujo está definido en `.github/workflows/uat-pipeline.yml`. Cuando el
repositorio ya tenga el proyecto publicado en la rama `main`:

1. En GitHub, abre el repositorio `DEYA7276/Pruebas_Aceptacion`.
2. Selecciona la pestaña **Actions**.
3. Para ejecución automática, haz `push` a `main` o abre un pull request cuyo
   destino sea `main`. El flujo **CI Pruebas de Aceptacion UAT** se iniciará.
4. Para ejecución manual, selecciona ese flujo, pulsa **Run workflow**,
   selecciona la rama `main` y confirma con **Run workflow**.
5. Abre la ejecución y revisa el trabajo `pruebas-uat`. Confirma que pasen la
   instalación de Node.js y Chromium, y la ejecución de las pruebas.
6. Descarga el artefacto `reporte-pruebas-aceptacion` desde la página de la
   ejecución para revisar el reporte HTML.

El flujo publica el reporte incluso si falla una prueba, siempre que Cucumber
haya podido generarlo. Un resultado exitoso debe mostrar `1 scenario (1
passed)` y `3 steps (3 passed)`.

## Si el repositorio de GitHub aún está vacío

La primera publicación debe hacerse desde la carpeta local que contiene
`index.html`, `package.json`, `features`, `src` y `.github`. Abre PowerShell en
esa carpeta y ejecuta estos comandos:

```powershell
git init
git branch -M main
git add .gitignore .github features src index.html package.json package-lock.json GUIA_PRUEBAS_ACEPTACION.md
git commit -m "Preparar prueba de aceptación del carrito"
git remote add origin https://github.com/DEYA7276/Pruebas_Aceptacion.git
git push -u origin main
```

Si `origin` ya existe, no repitas `git remote add origin`; revisa su dirección
con `git remote -v` y, si hace falta corregirla, usa:

```powershell
git remote set-url origin https://github.com/DEYA7276/Pruebas_Aceptacion.git
```

GitHub puede solicitar autenticación durante `git push`. Al terminar, abre
**Actions** y revisa el flujo iniciado por el `push`. No subas `node_modules`
ni el reporte HTML generado; `.gitignore` los excluye.

## Evidencia y conclusión

En la ejecución local validada, Cucumber informó `1 scenario (1 passed)` y
`3 steps (3 passed)`. El reporte HTML se genera localmente en
`reports/uat-report.html`; en GitHub Actions se publica como
`reporte-pruebas-aceptacion`.

La prueba cumple el objetivo de aceptación porque verifica el resultado de un
requisito de negocio en la interfaz que usa el cliente. La ejecución local
aprobada demuestra el funcionamiento del escenario en Chromium. La ejecución
remota se demuestra al publicar el proyecto y revisar la ejecución y el
artefacto en GitHub Actions; hasta completar ese primer `push`, GitHub no puede
mostrar un resultado remoto.
