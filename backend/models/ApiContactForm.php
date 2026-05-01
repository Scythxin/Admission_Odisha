<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * ApiContactForm is the model behind the contact form for API requests.
 */
class ApiContactForm extends Model
{
    public $name;
    public $email;
    public $subject;
    public $body;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // name, email, subject and body are required
            [['name', 'email', 'subject', 'body'], 'required'],
            // email has to be a valid email address
            ['email', 'email'],
        ];
    }

    /**
     * Sends an email to the specified email address using the information collected by this model.
     * @param string $email the target email address
     * @return bool whether the model passes validation
     */
    public function contact($email)
    {
        if ($this->validate()) {
            Yii::$app->mailer->compose()
                ->setTo($email)
                // I used my authenticated Gmail address to send it (to avoid Gmail blocking it as spam/spoofing),
                // but I set the Display Name to the actual sender's name.
                ->setFrom([Yii::$app->params['senderEmail'] => $this->name])
                // I set the Reply-To address to the actual sender, so when you click "Reply", it goes to them.
                ->setReplyTo([$this->email => $this->name])
                ->setSubject($this->subject)
                ->setTextBody($this->body)
                ->send();

            return true;
        }
        return false;
    }
}
