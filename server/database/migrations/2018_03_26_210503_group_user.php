<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GroupUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::dropIfExists('group_users');
         Schema::create('group_users', function(Blueprint $table){
             $table->integer('user_id')->unsigned();
             $table->foreign('user_id')->references('id')
                   ->on('users')->onDelete('cascade');
             
             $table->integer('group_id')->unsigned();
             $table->foreign('group_id')->references('id')
                   ->on('group')->onDelete('cascade');
 
             $table->timestamps();
         });
     }
 
     /**
      * Reverse the migrations.
      *
      * @return void
      */
     public function down()
     {
         Schema::drop('group_users');
     }
}
