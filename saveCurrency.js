function saveCurrency () {
    $lastComment = base64_encode($_POST['closeComment']);
    $CF_Level = $POST['CF_Level'];
    $codUsr = $POST['codUsr'];
    $sub_group_code = isset($POST['sub_group_code'])? trim($_POST['sub_group_code']): trim($_POST['le_code']);
    $txtrate = isset($POST["txtrate"])? $_POST['txtrate']: '02';
    $curr = $POST['newcurrency'];
    $creditfile_type = $POST['codtype_cdt'];

    if ($sub_group_code!= '') {
        if ($creditfile_type == 27) {
            $query_Line = "select * from dbo.\"SPU_TSPMCURDBE\"('".$sub_group_code."','".$curr."','".$txtrate."',".$codUsr.",'".$lastComment."','".$CF_Level."', 27)";
            $result_Line = pg_query($query_Line);
        } else {
            $query_Line = "select * from dbo.\"SPU_TSPMCURDBE\"('".$sub_group_code."','".$curr."','".$txtrate."',".$codUsr.",'".$lastComment."','".$CF_Level."', $creditfile_type)";
            $result_Line = pg_query($query_Line);
            $query_Line2 = "select * from dbo.\"SPU_LIMITS_TLINERIADBE\"('".$sub_group_code."', $creditfile_type, $codUsr)";
            $result_Line2 = pg_query($query_Line2);
        }

        if ($result_Line || $result_Line2) {
            echo '{"id": "success"}';
        } else {
            echo '{"id": "fail"}';
        }
    } else {
        echo '{"id": "fail"}';
    }
}
