<?php
date_default_timezone_set('UTC');

/**
 * @package DLCalendario
 * @author David E Luna M <davidlunamontilla@gmail.com>
 * @copyright David E Luna M <dlunamontilla@gmail.com>
 * @version 1.0.0
 * @license MIT
 * 
 */

class DLCalendario {
  public function __construct() {}

  protected function dias( int $mes, int $año ) : int {
    $dias = cal_days_in_month(CAL_GREGORIAN, (int) $mes, (int) $año);
    return $dias;
  }

  protected function diaSemana( int $dia, int $mes, int $año ) : string {
    $dias = "";

    $diasSemanas = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];

    $dias = $diasSemanas[date("w", mktime(0, 0, 0, (int) $mes, (int) $dia, (int) $año))];
    return $dias;
  }

  public function crear( int $mes, int $año ) : array {
    $calendario = [];
    $dias = (int) $this -> dias( $mes, $año );

    for ( $dia = 1; $dia <= $dias; $dia++ ) {
      array_push( $calendario, [
        "dia" => (int) $dia,
        "diaSemana" => (string) $this -> diaSemana( (int) $dia, (int) $mes, (int) $año )
      ]);
    }

    return $calendario;
  }
}