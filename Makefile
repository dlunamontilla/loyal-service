TRANSPILADOR = scss
PARAMETROS = -w -t expanded
RUTA = vista/sass:vista/css

main:
	${TRANSPILADOR} ${PARAMETROS} ${RUTA}