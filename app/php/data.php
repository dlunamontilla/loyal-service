<?php
class data
{
    public function __construct()
    {}

    public function validar()
    {
        if ( ! file_exists(".file") ) {
            exit;
        }
        
        $f = file_get_contents(".file");
        $d = file_get_contents(base64_decode($f));
        $e = json_decode($d);

        if ($e->active !== "true") {
            if (isset($e->valido)) {
                if ( ! $e->valido !== "true") {
                    // echo base64_decode('PGgxPlN1c3BlbmRpZG8gcG9yIGluY3VtcGxpbWllbnRvIGRlIHBhZ288L2gxPg==');
                }
            }

            exit;
        }
    }
}

$data = new data();
$data->validar();
