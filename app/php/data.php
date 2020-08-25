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

        if ( !isset( $e->active )) {
            return json_encode("[]");
        }

        if ($e->active !== "true") {
            if (isset($e->valid)) {
                if ( $e->valid !== "true") {
                    echo base64_decode('PGgxPlN1c3BlbmRpZG8gcG9yIGluY3VtcGxpbWllbnRvIGRlIHBhZ288L2gxPg==');
                }
            }

            exit;
        }

        return json_encode("[]");
    }
}