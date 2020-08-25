<?php 
	/**
	 * 
	 * @see Creado el 24 de junio de 2019
	 * @package DL Petitions
	 * @author David E Luna M <davidlunamontilla@gmail.com>
	 * @copyright (c) 2019 - David E Luna M
	 * @version v0.0.1
	 * 
	 */

  define("endl", "\n");
  
  // CINCO CONSTANTE FUNDAMENTALES:
  // Método de envío:
  define("DL_GET", "get");
  define("DL_POST", "post");

  // Forma de tratar los campos recibidos:
  define("DL_VOID", "vacio");
  define("DL_FULL", "lleno");
  define("DL_MIXED", "mezclado");
  

	class DLPeticiones {
    // Propiedades (atributos) protegidas:
    protected $method = "";
		protected $empty = "";
		protected $list = [];

    /**
     * __construct
     *
     * @param  mixed $method
     * @param  mixed $empty
     *
     * @return void
     */
    public function __construct( String $method, $empty = DL_VOID ) {
      if ( empty(trim( $method ) ) )
        return false;

      // Se establece el método de envío y si está o no vacío.
      $this -> method = $method;
      $this -> empty = $empty;
    }

		// Comparar dos array
		protected function compare( Array $arrayA, Array $arrayB ) {
			if ( !is_array($arrayA) && (int) count($arrayA) <= 0 )
				return false;
				
			if ( !is_array($arrayB) && (int) count($arrayB) <= 0 )
				return false;

			if ( (int) count($arrayA) !== (int) count($arrayB))
			return false;
			
			$num = 0;
			foreach ( $arrayA as $keyA => $valueA ) {
				foreach ( $arrayB as $keyB => $valueB ) {
					if ( $keyA == $keyB )
						$num++;
				}
			}
			
			if ( $num !== count($arrayA) || $num !== count($arrayB) ) 
				return false;
			
			return true;
		}

		public function validar( $lists = [] ) : bool {
			
			if ( !is_array($lists) )
				return false;

			// Devuelve false si no se detecta el método de envío:
			if ( empty(trim( $this -> method )))
				return false;
			
			// Se determina el método de envío de la petición del 
			// usuario:
			switch ( strtolower($this -> method) ) {
				case "get": // Si la instancia de clase es un get
					$this -> list = $_GET;
					break;
				
				case "post": // Si la instancia de clase es un post
					$this -> list = $_POST;
					break;
			}

			// Devuelve false si las peticiones están vacías, 
			// independientemente del método de envío:
			if ( count($this -> list ) <= 0 || count($lists) <= 0 )
				return false;

			if ( $this -> compare( $this -> list, $lists ) ) {
				foreach ( $lists as $key => $empty ) {
					if ( ! $empty )
						if ( empty(trim($this -> list[$key])) )
							return false;
				}

				return true;
			}
		
			return false;
		}

		// PROCESAR TÍTULOS
		public function titulo( Array $datos, $titulos = [] ) {
			if ( !is_array($datos) )
				return;

			if ( count($datos) < 1 )
				return "INICIO";

			if ( !is_array($titulos))
				return;

			if ( count($titulos) < 1 )
				return;

			if ( $this -> validar($datos) ) {
				foreach ($datos as $key => $value) {
					if ( key_exists($key, $titulos) )
						return $titulos[$key];
				} 
			}
		}
	}
?>