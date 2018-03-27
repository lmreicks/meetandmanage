<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Group extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::dropIfExists('group');
         Schema::create('group', function(Blueprint $table){
             $table->integer('id')->unsigned();
 
             $table->string('name');
             $table->string('description');
 
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
         Schema::drop('group');
     }
}
