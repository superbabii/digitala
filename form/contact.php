<?php
header('Content-type: application/json');
require_once('php-mailer/PHPMailerAutoload.php'); // Include PHPMailer

$mail = new PHPMailer();
$emailTO = $emailBCC =  $emailCC = array();

### Enter Your Sitename 
$sitename = 'Your Site Name';

### Enter your email addresses: @required
$emailTO[] = array( 'email' => 'email@yoursite.com', 'name' => 'Your Name' ); 

// Enable bellow parameters & update your BCC email if require.
//$emailBCC[] = array( 'email' => 'email@yoursite.com', 'name' => 'Your Name' );

// Enable bellow parameters & update your CC email if require.
//$emailCC[] = array( 'email' => 'email@yoursite.com', 'name' => 'Your Name' );

// Enter Email Subject
$subject = "Contact Us" . ' - ' . $sitename; 

// Success Messages
$msg_success = "We have <strong>successfully</strong> received your message. We'll get back to you soon.";

if( $_SERVER['REQUEST_METHOD'] == 'POST') {
	if (isset($_POST["cf_email"]) && $_POST["cf_email"] != '' && isset($_POST["cf_name"]) && $_POST["cf_name"] != '') {
		// Form Fields
		$cf_email = $_POST["cf_email"];
		$cf_name = $_POST["cf_name"];
		$cf_address = isset($_POST["cf_subject"]) ? $_POST["cf_subject"] : '';
		$cf_address = isset($_POST["cf_address"]) ? $_POST["cf_address"] : '';
		$cf_company = isset($_POST["cf_company"]) ? $_POST["cf_company"] : '';
		$cf_date = isset($_POST["cf_date"]) ? $_POST["cf_date"] : '';
		$cf_budget = isset($_POST["cf_budget"]) ? $_POST["cf_budget"] : '';
		$cf_msg = isset($_POST["cf_msg"]) ? $_POST["cf_msg"] : '';

		$honeypot 	= isset($_POST["form-anti-honeypot"]) ? $_POST["form-anti-honeypot"] : '';
		$bodymsg = '';
		
		if ($honeypot == '' && !(empty($emailTO))) {
			$mail->IsHTML(true);
			$mail->CharSet = 'UTF-8';

			$mail->From = $cf_email;
			$mail->FromName = $cf_name . ' - ' . $sitename;
			$mail->AddReplyTo($cf_email, $cf_name);
			$mail->Subject = $subject;
			
			foreach( $emailTO as $to ) {
				$mail->AddAddress( $to['email'] , $to['name'] );
			}
			
			// if CC found
			if (!empty($emailCC)) {
				foreach( $emailCC as $cc ) {
					$mail->AddCC( $cc['email'] , $cc['name'] );
				}
			}
			
			// if BCC found
			if (!empty($emailBCC)) {
				foreach( $emailBCC as $bcc ) {
					$mail->AddBCC( $bcc['email'] , $bcc['name'] );
				}				
			}

			// Include Form Fields into Body Message
			$bodymsg .= isset($cf_name) ? "Contact Name: $cf_name<br><br>" : '';
			$bodymsg .= isset($cf_email) ? "Contact Email: $cf_email<br><br>" : '';
			$bodymsg .= isset($cf_subject) ? "Contact Email: $cf_subject<br><br>" : '';
			$bodymsg .= isset($cf_address) ? "Contact Address: $cf_address<br><br>" : '';
			$bodymsg .= isset($cf_company) ? "Company: $cf_company<br><br>" : '';
			$bodymsg .= isset($cf_date) ? "Date: $cf_date<br><br>" : '';
			$bodymsg .= isset($cf_budget) ? "Budget: $cf_budget<br><br>" : '';
			$bodymsg .= isset($cf_msg) ? "Message: $cf_msg<br><br>" : '';
			$bodymsg .= $_SERVER['HTTP_REFERER'] ? '<br>---<br><br>This email was sent from: ' . $_SERVER['HTTP_REFERER'] : '';
			
			$mail->MsgHTML( $bodymsg );
			$is_emailed = $mail->Send();

			if( $is_emailed === true ) {
				$response = array ('result' => "success", 'message' => $msg_success);
			} else {
				$response = array ('result' => "error", 'message' => $mail->ErrorInfo);
			}
			echo json_encode($response);
			
		} else {
			echo json_encode(array ('result' => "error", 'message' => "Bot <strong>Detected</strong>.! Clean yourself Botster.!"));
		}
	} else {
		echo json_encode(array ('result' => "error", 'message' => "Please <strong>Fill up</strong> all required fields and try again."));
	}
}