<?php

class Flickr { 
	private $apiKey = '78fc47e887da553c5b397c61822c5854'; 
 
	public function __construct() {
	} 
 
	public function search($search, $page, $perPage, $tagmode, $sortBy, $tagsOrText) { 
		$ch = curl_init();
		//$perPage = 10;
		//$search  = $_GET['search'];
		//$page =  $_GET['page'];
		//echo "Search: " . $search . "<br />";
		//echo "Page: " . $page . "<br />";
		if (!$page){ $page = 1;}
		
		$url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' . $this->apiKey . '&' . $tagsOrText . '=' . urlencode ($search) . '&sort=' . $sortBy .'&content_type=1&media=photos&page=' . $page . '&per_page=' . $perPage . '&tagmode=' . $tagmode .'&extras=tags,url_m,owner_name,views,date_taken,description&format=json&nojsoncallback=1';
		//echo $url;
		//$search = 'https://flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=' . $this->apiKey . '&tag=' . urlencode($query) . '&tagmode=any&perpage=80&sort=INTERESTINGNESS_DESC&format=json&nojsoncallback=1';
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_URL, $url);
		$curl_response = curl_exec($ch);
		curl_close($ch);
		 
		//echo($curl_response);

		$array = json_decode($curl_response, true);
		
		 $photosArray = $array['photos']['photo'];
		 $jsonArray = array();

		//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
		foreach($photosArray as $key => $value)
		{
			$idNum = $key + $perPage * ($page - 1);
			$thumbURL = "https://farm" . $value['farm'] . ".staticflickr.com/" . $value['server'] . "/" . $value['id'] . "_" . $value['secret'] . "_s.jpg";
			$smallURL = "https://farm" . $value['farm'] . ".staticflickr.com/" . $value['server'] . "/" . $value['id'] . "_" . $value['secret'] . "_n.jpg";
			$bigURL = "https://farm" . $value['farm'] . ".staticflickr.com/" . $value['server'] . "/" . $value['id'] . "_" . $value['secret'] . "_b.jpg";
		  	//echo '<img src="' . $value['url_m'] . '"/>';
		    $jsonArray[$key] = array("id" => $idNum, "flickrID" => $value['id'], "smallURL" => $smallURL, "title" => $value['title'], "views" => $value['views'], "owner_name" => $value['owner_name'], "owner" => $value['owner'], "date_upload" => $value['date_upload'], "date_taken" => $value['date_taken'], "media" => $value['media'], "path_alias" => $value['path_alias'], "description" => $value['description'],"tags" => $value['tags'], "mediumURL" => $value['url_m'], "thumbURL" => $thumbURL, "bigURL" => $bigURL);
		  //$jsonArray[$key] = array("id" => $key);
		  /*foreach($value as $key2 => $value)
		  	{
		  		//echo $key2 . " : " . $value;
		  	}*/
		}

		echo json_encode($jsonArray) ;

		//echo $json=>{'photos'};
		//echo json_encode($json, JSON_PRETTY_PRINT);
		/*
		$search = 'http://flickr.com/services/rest/?method=flickr.photos.search&api_key=' . $this->apiKey . '&text=' . urlencode($query) . '&per_page=50&format=php_serial';
		$result = file_get_contents($search); 
		$result = unserialize($result); 

		foreach($result['photos']['photo'] as $photo) { 
		// the image URL becomes somthing like 
		// http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg  
		echo '<img src="' . 'http://farm' . $photo["farm"] . '.static.flickr.com/' . $photo["server"] . '/' . $photo["id"] . '_' . $photo["secret"] . '.jpg">'; 
}		*/
	}
}

$Flickr = new Flickr; 
$data = $Flickr->search($_GET['search'], $_GET['page'], $_GET['perPage'], $_GET['tagMode'], $_GET['sortBy'], $_GET['tagsOrText']); 
//echo $data;